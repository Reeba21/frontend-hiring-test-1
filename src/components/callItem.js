import dateFormat from "dateformat";
export const CallItem = ({ item, modalHandler, archiveHandler, HMS }) => {
  return (
    <tr>
      <td>{item.from}</td>
      <td>{item.to}</td>
      <td>{item.via}</td>
      <td>{HMS(item.duration)}</td>
      <td>{item.call_type}</td>
      <td>
        {dateFormat(
          Date.parse(item.created_at),
          "dddd, mmmm dS, yyyy, h:MM:ss TT"
        )}
      </td>
      <td>
        <button onClick={() => modalHandler(item)} className="btn btn-info">
          Details
        </button>
        {console.log(item)}
        {item.is_archived ? (
          <button
            onClick={(e) => {
              archiveHandler(false, e.target.id);
              e.target.innerHTML = "Archive";
            }}
            className="btn btn-info right"
            id={item.id}
          >
            Unarchive
          </button>
        ) : (
          <button
            onClick={(e) => {
              archiveHandler(true, e.target.id);
              e.target.innerHTML = "Unarchive";
            }}
            className="btn btn-info right"
            id={item.id}
          >
            Archive
          </button>
        )}
      </td>
    </tr>
  );
};
