import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import { userActions } from '../actions';


function ReservationTable () {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  let [clients, setClients] = useState({columns: [], data: []});

  useEffect(() => {
    if (users.items.length > 0) {
      setClients({
        columns: [
          { title: 'First Name', field: 'firstName' },
          { title: 'Last Name', field: 'lastName', initialEditValue: 'initial edit value' },
          { title: 'Date Of reservation', field: 'datetime' },
          { title: 'Outlet', field: 'outlet' },
        ],
        data: users.items
      });
    }
}, [users.items]);

  return (
    <MaterialTable
      options={{
          rowStyle: {
              fontSize: 240,
          }
      }}
      title="Editable Preview"
      columns={clients.columns}
      data={clients.data}
      editable={{
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                let data = clients.data;
                const index = data.indexOf(oldData);
                dispatch(userActions.delete(oldData.id));
                data.splice(index, 1);
                setClients(data);
              }
              resolve()
            }, 1000)
          }),
      }}
    />
  );
}

export default ReservationTable ;
