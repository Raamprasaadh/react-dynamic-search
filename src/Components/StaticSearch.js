export default function StaticSearch(props) {
    let {fc, dataCopy, updateFC, search, clear} = props;
    return (
      <div className="static">
        <h3> Static search</h3>
        <label htmlFor="id">Id:</label>
        <select
          id="id"
          value={fc.id}
          onChange={(e) => updateFC("id", e.target.value)}
        >
          <option id="id_blank" value=""></option>
          {dataCopy.map((data) => (
            <option id={data.id} value={data.id}>
              {data.id}
            </option>
          ))}
        </select>
        <label htmlFor="staticTitle">Title:</label>
        <select
          id="title"
          value={fc.title}
          onChange={(e) => updateFC("title", e.target.value)}
        >
          <option id="title_blank" value=""></option>
          {dataCopy.map((data) => (
            <option id={"title" + data.id} value={data.title}>
              {data.title}
            </option>
          ))}
        </select>
        <button onClick={() => search()}>Search</button>
        <button onClick={() => clear()}>clear</button>
      </div>
    );
  }