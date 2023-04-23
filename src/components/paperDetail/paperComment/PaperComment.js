function PaperComment({ reviewerName, appropriateness, contribution, correctness }) {
  return (
    <div
      style={{
        borderStyle: "solid",
        borderColor: "gray",
        paddingLeft: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#E8F8FA'
      }}
    >
      <h3>{reviewerName}</h3>
      <p>Appropriateness: {appropriateness}</p>
      <p>Contribution: {contribution}</p>
      <p>Correctness: {correctness}</p>
    </div>
  );
}

export default PaperComment;
