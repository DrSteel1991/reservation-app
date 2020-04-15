import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { userActions } from '../actions';
import {getDayName, getWeek} from '../helpers';

// Generate Sales Data
function createData(date, count) {
  return { date, count };
}

export default function Chart() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const data = [];

  getWeek().map((el) => {
    return data.push(createData(
      getDayName(new Date(el).getDay()),
      users.items.filter((f) => {
        return f.datetime.slice(0, 10) === el;
      }).length
    ))
  });  
  
  useEffect(() => {
      dispatch(userActions.getAll());
  }, []);


  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Reservations Per week
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="count" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
