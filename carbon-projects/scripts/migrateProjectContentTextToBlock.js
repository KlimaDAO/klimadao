// scripts/textToBlock.js

/* eslint-disable no-console */
import { customAlphabet } from "nanoid";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2021-09-01" });

const nanoid = customAlphabet("0123456789abcdef", 12);

const TYPE = "projectContent"; // document _type to consider

const fetchDocuments = () =>
  client.fetch(`*[_type == "${TYPE}"][0..50] {_id, _rev, longDescription}`);

const buildPatches = (docs) =>
  docs.map((doc) => {
    const paragraphs = doc.longDescription.split("\n");
    const output = paragraphs.map((paragraph) => ({
      _key: nanoid(),
      _type: "block",
      markDefs: [],
      style: "normal",
      children: [
        {
          _key: nanoid(),
          _type: "span",
          marks: [],
          text: paragraph,
        },
      ],
    }));

    return {
      id: doc._id,
      patch: {
        set: {
          longDescription: output,
        },
        ifRevisionID: doc._rev,
      },
    };
  });

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);

  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
