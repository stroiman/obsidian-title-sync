import {
	TFile,
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginManifest,
	PluginSettingTab,
	Setting,
} from "obsidian";
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
		const metadata = this.app.metadataCache.getFileCache(file);
		if (!metadata) {
			return;
		}
		const oldName = path.parse(oldPath).name;
		const h1 = metadata?.headings.find((x) => x.level === 1);

		if (
			h1 &&
			h1.heading.localeCompare(oldName, "en", { sensitivity: "base" }) ===
				0
		) {
			this.app.vault.process(file, (contents) => {
				const start = contents.slice(0, h1.position.start.offset);
				const end = contents.slice(h1.position.end.offset);
				const newHeading = "# " + file.basename;
				return start + newHeading + end;
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
