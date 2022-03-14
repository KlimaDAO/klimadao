import { readdirSync } from "fs";
import path from "path";
import PO from "pofile";

// Trick to get Item type
const Item = new PO["Item"]();

// Constants
const PREFIX = "hint: ";
const SOURCE = "en";

// Add an hint to a po file
function add_hint_po_file(destination: PO, source_item: typeof Item) {
  for (const item of destination.items) {
    if (item.msgid == source_item.msgid) {
      const hint = `${PREFIX}"${source_item.msgstr}"`;
      let found = false;
      // Update existing hint
      for (const [i, comment] of item.comments.entries()) {
        if (comment.startsWith(PREFIX)) {
          item.comments[i] = hint;
        }
        found = true;
        break;
      }
      // New hint
      if (!found) {
        item.comments.push(hint);
      }
    }
  }
}

// Add hints from a po file msgstrs to another po file
function add_hints_to_po_files(source: PO, destination: PO) {
  for (const item of source.items) {
    add_hint_po_file(destination, item);
  }
}

// Add hints from a po file msgstrs to another po file using filenames
function add_hints_to_po_filenames(
  sourceFilename: string,
  destinationFilename: string
) {
  PO.load(sourceFilename, function (err, sourcePo) {
    PO.load(destinationFilename, function (err, destinationPo) {
      add_hints_to_po_files(sourcePo, destinationPo);
      destinationPo.save(destinationFilename, () => {
        // Do nothing.
      });
    });
  });
}

// Add hints to all po files of a directory
async function add_hints_to_po_directory(directoryName: string) {
  const sourceFilename = path.join(directoryName, SOURCE, "messages.po");
  readdirSync(directoryName, { withFileTypes: true })
    .filter((dir) => dir.isDirectory() && dir.name != SOURCE)
    .map((dir) => {
      const destinationFilename = path.join(
        directoryName,
        dir.name,
        "messages.po"
      );
      add_hints_to_po_filenames(sourceFilename, destinationFilename);
    });
}

const args = process.argv.slice(2);
add_hints_to_po_directory(args[0]);
