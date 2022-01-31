import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { CallItem } from "./callItem";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import { CallModal, ArchiveModal, UnArchiveModal } from "./modals";

function HMS(seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  return `${date.toISOString().substr(11, 8)}`;
}

function Items({ callItems, isLoading, archive, setArchive }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [archiveModalVisible, setArchiveModalVisible] = useState(false);
  const [unArchiveModalVisible, setUnArchiveModalVisible] = useState(false);

  const [callItem, setCallItem] = useState({});
  const [callDuration, setCallDuration] = useState(0);

  async function archiveCall(id) {
    const access_token = JSON.parse(sessionStorage.getItem("access_token"));
    await fetch(`https://frontend-test-api.aircall.io/calls/${id}/archive`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
        alert("Looks like you aren't connected to the internet!");
      })
      .finally(() => {
        setArchive(!archive);
      });
  }
  function modalHandler(item) {
    setModalVisible(true);
    setCallItem(item);
    setCallDuration(HMS(item.duration));
  }
  function archiveHandler(archived, id) {
    archived ? setArchiveModalVisible(true) : setUnArchiveModalVisible(true);
    setTimeout(() => {
      setArchiveModalVisible(false);
      setUnArchiveModalVisible(false);
    }, 1500);

    archiveCall(id);
    setArchive(archived);
  }

  return isLoading ? (
    <div className="center container">
      <Dots />
    </div>
  ) : (
    <div>
      <h3 className="text-center text-bold">CALLS INFORMATION</h3>
      <table className="table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th>FROM</th>
            <th>TO</th>
            <th>VIA</th>
            <th>CALL DURATION</th>
            <th>CALL TYPE</th>
            <th>DATE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {callItems.map((item) =>
            modalVisible ? (
              <>
                <CallModal
                  item={callItem}
                  modalState={modalVisible}
                  setModalState={setModalVisible}
                  duration={callDuration}
                />
              </>
            ) : (
              <>
                {archiveModalVisible && (
                  <ArchiveModal
                    item={callItem}
                    modalState={archiveModalVisible}
                    setModalState={setArchiveModalVisible}
                  />
                )}
                {unArchiveModalVisible && (
                  <UnArchiveModal
                    item={callItem}
                    modalState={unArchiveModalVisible}
                    setModalState={setUnArchiveModalVisible}
                  />
                )}
                <CallItem
                  item={item}
                  modalHandler={modalHandler}
                  archiveHandler={archiveHandler}
                  HMS={HMS}
                />
              </>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({ limit, callItems, totalPages, archive, setArchive }) {
  // We start with an empty list of items
  const pageCount = totalPages;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState(callItems);
  const [isLoading, setIsLoading] = useState(false);

  // Invoke when user click to request another page.
  const handlePageClick = async (event) => {
    setIsLoading(true);
    const access_token = JSON.parse(sessionStorage.getItem("access_token"));
    setItemOffset(itemOffset + limit);
    await fetch(
      `https://frontend-test-api.aircall.io/calls?offset=${
        itemOffset + limit
      }&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.nodes);
        console.log(data);
        // this gives an object with dates as keys
        const groups = data.nodes.reduce((groups, call) => {
          const date = call.created_at.split("T")[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(call);
          return groups;
        }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            calls: groups[date],
          };
        });

        console.log(11, groupArrays);
      })
      .catch((error) => {
        console.log(error);
        alert("Looks like you aren't connected to the internet!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container">
      <div className="row m-1">
        <Items
          callItems={items}
          isLoading={isLoading}
          archive={archive}
          setArchive={setArchive}
        />
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"blue"}
        />
      </div>
    </div>
  );
}

export default Pagination;
