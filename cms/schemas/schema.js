import author from "./author";
import blockContent from "./blockContent";
import fileUpload from "./fileUpload";
import podcast from "./podcast";
import post from "./post";
import tag from "./tag";

// The following are document types which will appear
// in the studio.
// When added to this list, object types can be used as
// { type: 'typename' } in other document schemas
export default [post, author, fileUpload, blockContent, podcast, tag];
