import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Body(props) {
    let { data }= props;
    return ( <div className="body">
    {data.length > 0 ? (
      data.map((data) => (
        <div key={data.id}>
          <div className="dataCard">
            {(data.completed)?<FontAwesomeIcon icon="far-solid far-check" />:<FontAwesomeIcon icon="far-solid far-calendar-circle-exclamation" />}
            <p className="userId">{`ID: ${data.id}`}</p>
            <p className="title">{`Title: ${data.title}`}</p>
            {/** movestyle to class name and add styles// suggestion */}
            <p
              className={`completed`}
              style={data.completed ? { color: "green" } : { color: "red" }}
            >{`isCompleted: ${data.completed.toString()}`}</p>
          </div>
        </div>
      ))
    ) : (
      <div>No record available</div>
    )}
  </div> );
}

export default Body;