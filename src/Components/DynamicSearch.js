export default function DynamicSearch(props) {
    return (
      <div className="dynamic">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={props.dst}
          onChange={(e) => {props.dynamicSearch(e.target.value)}}
        />
      </div>
     );
   }