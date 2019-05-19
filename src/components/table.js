import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

import '../App.css';
const row = (x,i,header) =>(

        <TableRow key={i} >
        {
            header.map((y,k)=> (
                <TableCell key={k} className="td" >
                    {x[y.props]}
                </TableCell>
            ))
        }
    </TableRow>
);

export default({data,header, handleSort,columnToSort,sortDirection}) =>
      <Table >
        <TableHead >
          <TableRow  >
          {header.map((x,i)=>
            <TableCell key = {i} className="td" >
                <div style={{
                     display: "flex",
                     alignItems: "center"
                   }}onClick={() => handleSort(x.props)}>
                <span>{x.name}</span>
                {columnToSort === x.props ? (
                    sortDirection === "asc" ? (
                        <ArrowDropDownIcon />
                    ) : (
                        <ArrowDropUpIcon/>
                    )
                  ) : null}
                </div>
            </TableCell>
          )}

          </TableRow>
        </TableHead>
        <TableBody display="flex">
            {data.map((x,i) => row(x,i, header))}
        </TableBody>
      </Table>;


