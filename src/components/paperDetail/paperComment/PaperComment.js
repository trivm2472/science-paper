function PaperComment({name, commentContent}) {
  return (
    <div
      style={{
        borderStyle: "solid",
        borderColor: "gray",
        paddingLeft: 10,
        marginTop: 20,
        borderRadius: 30,
        marginRight: 30,
        backgroundColor: '#E8F8FA'
      }}
    >
      <h3>{name}</h3>
      <p>{commentContent}</p>
    </div>
  );
}

export default PaperComment;
