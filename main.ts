import { TFile, App, Plugin, PluginManifest } from "obsidian";
import * as path from "path";

// Remember to rename these classes and interfaces!

// interface MyPluginSettings {
// 	mySetting: string;
// }

// const DEFAULT_SETTINGS: MyPluginSettings = {
// 	mySetting: "default",
// };

export default class MyPlugin extends Plugin {
	// settings: MyPluginSettings;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.handleRename = this.handleRename.bind(this);
	}

	handleRename(file: TFile, oldPath: string) {
		const newMetadata = this.app.metadataCache.getFileCache(file);
		const oldMetadata = this.app.metadataCache.getCache(oldPath);
		const metadata = newMetadata || oldMetadata;
		const oldName = path.parse(oldPath).name;
		const h1 = metadata?.headings?.find((x) => x.level === 1);

		if (h1 && h1.heading === oldName) {
			this.app.vault.process(file, (contents) => {
				const oldHeading = contents
					.slice(h1.position.start.offset + 1, h1.position.end.offset)
					.trim();
				if (oldHeading !== oldName) {
					// Just a safety precaution if the cached metadata was not
					// in sync with file contents, we'd corrupt the file.
					// We could possibly retry, but this is _probably_ onlikely.
					console.warn(
						"stroiman-title-renamer - bail due inconsistent data",
						{
							oldHeading,
							oldName,
						},
					);
					return contents;
				} else {
					const start = contents.slice(0, h1.position.start.offset);
					const end = contents.slice(h1.position.end.offset);
					const newHeading = "# " + file.basename;
					return start + newHeading + end;
				}
			});
		}
	}

	async onload() {
		// await this.loadSettings();
		this.registerEvent(this.app.vault.on("rename", this.handleRename));
	}

	onunload() {}

	// async loadSettings() {
	// 	this.settings = Object.assign(
	// 		{},
	// 		DEFAULT_SETTINGS,
	// 		await this.loadData(),
	// 	);
	// }
	//
	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}
