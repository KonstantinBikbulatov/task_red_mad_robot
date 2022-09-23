import React from 'react';

const Table = (props) => {

    const days = [];
    let data = props.data;

    for (let i = 1; i <= 31; i++) {
        days.push(i)
    }
    days.push('Total')

    return (
        <table>
            <thead>
            <tr>
                <td className="table__td-first">User</td>
                {days.map((day) => <td className="table__td">{day}</td>)}
            </tr>
            </thead>
            <tbody>
            {
                data.map((row) =>
                    <tr>
                        <td>{row.name}</td>
                        {
                            row.days.map((column) =>
                            <td>{column}</td>
                            )
                        }
                        <td>{row.days.result}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
}

export default Table;
