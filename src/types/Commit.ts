type Commit = {
  id: string;
  url: string;
  message: string;
  committer: {
    date: string;
    name: string;
  };
}
export default Commit;
