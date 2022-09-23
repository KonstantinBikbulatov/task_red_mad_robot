import React, {useEffect, useState} from "react";

import Table from '../components/Table'
import '../scss/app.scss'

export const App = () => {
    const [dataTable, setData] = useState([]);
    const [searchValue, setSearch] = useState("");

    const [dataTableSource, setDataTableSource] = useState([]);

    const search = (value) => {
        setSearch(value)
        const searchArr = dataTableSource.filter(word => (word.name).toLowerCase().includes(value));
        setData(searchArr)
    }

    const processData = (data) => {
        let resultData = [];
        let daysArr = [];

        for (let i = 1; i <= 31; i++) {
            daysArr[i] = 0
        }

        let sumMinResult = 0;
        let sumHoursResult = 0;

        for (let i = 0; i < data.length; i++){
            resultData[i] = {days: Object.assign([], daysArr), name: data[i].Fullname}
            data[i].Days.forEach((item) => {
                let [, , day] = item.Date.split('-');
                day = day.replace(/^0+(?!\.|$)/, '')

                let [startHour, startMin] = item.Start.split('-');
                let [endHour, endMin] = item.End.split('-');
                let sumMin = Number(startMin) + Number(endMin);

                let hours = Math.floor(sumMin / 60);
                let minutes = sumMin % 60;

                sumMinResult += minutes;
                sumHoursResult += hours + (endHour - startHour);

                resultData[i].days[day] = hours + (endHour - startHour) + ':' + minutes;
            })

            let hours = Math.floor(sumMinResult / 60)
            let minutes =sumMinResult % 60

            resultData[i].days['result'] = hours + sumHoursResult + ':' + minutes;

            sumMinResult = 0;
            sumHoursResult = 0;
        }

        setDataTableSource(Object.assign([], resultData))

        setData(resultData)
    }
    const getData = () => {
        fetch("http://localhost:8080/api/users/", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) =>  processData(data));
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="wrapper">
            <div className="input__search">
                <span>Поиск</span>
                <input value={searchValue} onChange={(e) => search(e.target.value)}/>
            </div>
            {dataTable ? <Table data={dataTable}/> : <div>Загрузка</div>}
        </div>
    )
}