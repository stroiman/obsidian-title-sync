# Obsidian Title Renamer

Plugin for [Obsidian](https://obsidian.md) to keep inline title synced with file
name.

NOTE: currently only works on desktop.

## Description

When you rename a file, this plugin will search for an "H1", in the document. If
this is found, and the current text matches the old filename, it will be updated
to reflect the new filename.

Only the first "H1" is replaced.

## Background?

I personally prefer to have the page title in the contents of the file, and
disable "Show inline title" in Obsidian.

- I prefer to have the contents of the markdown file to be self-contained, so
  when reading the content in another editor, I don't miss important context.
- The "title" may not necessarily be the file name
  - I may want to have several notes with the same "title", so I would need to
    add some extra context to the actual file name.
    - For example, I might have a note on the concept of "Domain-driven Design",
      and a note on the book by Eric Evans of the same name. The latter might
      have the file name "Domain-drivern Design (book)", but the displayed title
      should not have the "(book)" in it. 
  - Sometimes, the title is not a valid file name.
    - I make notes on some of our customers. And Danish companies end with "A/S"
      in the name to indicate a publicly tradable company. The "/" is not valid
      in the file name, but I want to show it in the title.

## Which problem does this solve?

This plugin primarily solves some annoyances when creating new notes using
templates. 

When creating a new note, Obsidian names it "Untitled". My template would fill
`# Untitled` in the contents. The file name is now highlighted, ready for me to
type in the real name of the note. But after having done that, only the file
name is changed, not the template-generated inline title.

This plugin fixes that.

## Nothing happens, why?

If the file name and `h1` is in sync, and nothing happens, Obsidian's metadata
cache is probably not in sync.

Obsidian has a data structure representing representing a rich model of the
data, specifying that "here is a title", "here is body text", "here is a code
block", etc. This is what the plugin use to find the location and text of the 
heading.

When the file is updated, this is an operation on the entire unprocessed text of
the file. If the metadata was not in sync with the latest content, the locations
from the previous step are no longer valid. The plugin will not modify the file
if this happens, as it'd probably corrupt the file (an example could be
overwriting frontmatter with the new title).

## What sets this apart from "Obsidian Filename Heading Sync"?

There is an alternate plugin, you might want to check out:
[Obsidian Filename Heading Sync](https://github.com/dvcrn/obsidian-filename-heading-sync).
This handles some of the same problems, but seems to have a different 
philosophy, that the filename and heading should _always_ be in synced.

That makes "Obsidian Filename Heading Sync" much more aggressive than mine.
E.g., the default settings will:

- Rename the file when you change the heading in the markdown contents.
- Insert a heading in the markdown contents when opening a file that doesn't
  have one.

I don't want neither of those two behaviours. If I change the heading in the 
markdown contents, it's a deliberate action on my part to have a different 
heading than file names. (otherwise I would have just renamed the file). And
creating the heading in the contents is a problem I use templates to solve.

This also makes this plugin significantly simpler, as there are no edge

## TODO (perhaps)

Currently, I can imagine these two improvements.

### Make this work on mobile 

Should be simple enough. Currently this depends on node's "path" module to get
the expected old title from the old file name. This could easily be replaced
with a regex, but in particular core difference between Windows filesystem and
Linux/MacOS needs to be tested here.

### Use localised case insensitive search.

Handle localised case insensitivity in title comparison. This would require a
settings page, so the user can specify the language that they actually write
notes in.

## Support this work

You can support my work here:

<a href="https://www.buymeacoffee.com/stroiman" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
