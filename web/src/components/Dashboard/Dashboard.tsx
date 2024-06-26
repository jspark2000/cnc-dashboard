import React, { useEffect, useState } from 'react';
import io  from "socket.io-client";
import axios from 'axios';
import Chart from './components/Chart';
import Labels from './components/Labels';
import { CNCData } from '../../utils/cncData';
import styled from 'styled-components';
import Checkboxes from './components/CheckBoxes';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

const ENDPOINT = "http://localhost:4000";


const colorArray = ['red', 'blue', 'purple', 'green'];

type ValueType = {
	key: string;
	value: boolean;
};

const initialvalues = [
  // { key: "timestamp", value: true },
  { key: "spindlerpm", value: true },
  { key: "currentfeadrate", value: true },
  { key: "spindleload", value: true },
  // { key: "xaxis", value: true },
  // { key: "zaaxis", value: true },
  { key: "toolgroupid", value: true },
  { key: "toollifecounter", value: true },
  { key: "partcounter", value: false },
  { key: "powerontime", value: false },
  // { key: "operationtime", value: false },
  // { key: "cuttime", value: false },
  // { key: "cycletime", value: false },
  { key: "alarm0", value: false },
  { key: "alarm1", value: false },
  { key: "alarm2", value: false },
  { key: "alarm3", value: false },
  { key: "alarm4", value: false },
  { key: "alarm5", value: false },
  { key: "alarm6", value: false },
  { key: "alarm7", value: false },
  { key: "alarm8", value: false },
  { key: "alarm9", value: false },
  { key: "alarm10", value: false },
  { key: "alarm11", value: false },
  { key: "alarm12", value: false },
  { key: "alarm13", value: false },
  { key: "alarm14", value: false },
  { key: "axesno", value: false },
  { key: "onoff", value: false },
  { key: "ncprogno", value: false },
  { key: "ncmainprogno", value: false },
  { key: "spindleno", value: false },
  { key: "operationmode", value: false },
  { key: "servocurrent1", value: false },
  { key: "servocurrent2", value: false },
  { key: "servocurrent3", value: false },
  { key: "servocurrent4", value: false },
  { key: "servocurrent5", value: false },
  { key: "servomotorspeed1", value: false },
  { key: "servomotorspeed2", value: false },
  { key: "servomotorspeed3", value: false },
  { key: "servomotorspeed4", value: false },
  { key: "servomotorspeed5", value: false },
  { key: "temp", value: false },
  { key: "gcodegroupno", value: false },
  { key: "gcodeflag", value: false },
  // { key: "gcode", value: false },
];
  

const Dashboard = () => {

  const [data, setData] = useState<CNCData[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const [values, setValues] = useState<ValueType[]>(initialvalues);

  // const [selectedData, setSelectedData] = useState<CNCData[]>([]);

  const [series, setSeries] = useState<ChartProps['series']>([{name: '', data: []}]);

  const [timestamps, setTimestamps] = useState<string>('');

  const SHOW_COUNT = 7;

  const socket = io('http://localhost:4000', {});

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('FromAPI', (newData: CNCData) => {
    // console.log(newData);
    setData((prevData) => [newData, ...prevData].slice(0, 50));
  });

  useEffect(() => {
    axios.get('http://localhost:4000/data')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);


  useEffect(() => {
    const selectLabels = values.slice(0, Math.min(SHOW_COUNT, values.length)).map((val) => val.key);

    setSelectedLabels(selectLabels);

  }, []);


  const handleLabelChange = (key: string) => {
    if (selectedLabels.includes(key)) {
      setSelectedLabels(selectedLabels.filter((label) => label !== key));
    } else {
      setSelectedLabels([...selectedLabels, key]);
    }
  };

  useEffect(() => {
    registerSeries(data);
  }, [data]);
  
  useEffect(() => {
    // console.log(selectedLabels);
    const selectedData = data.map((d) => {
      const sd: any = { timestamp: d.timestamp };
      selectedLabels.forEach((label) => {
        sd[label] = d[label as keyof CNCData];
      });
      return sd;
    }
    );

    registerSeries(selectedData);

  }, [selectedLabels]);


  const registerSeries = (data: CNCData[]) => {
    if (data.length === 0) {
      return;
    }

    const series: any[] = [];

    selectedLabels.forEach((l) => {
      
      // if (d.timestamp) {
      //   timestamps.push(d.timestamp);
      // }

      if (l.includes('spindlerpm')) {
        const spindlerpm = { name: 'Spindle RPM', data: data.map((d) => d.spindlerpm) };
        series.push(spindlerpm);
      }

      if (l.includes('currentfeadrate')) {
        const currentfeadrate = { name: 'Current Feed Rate', data: data.map((d) => d.currentfeadrate) };
        series.push(currentfeadrate);
      }

      if (l.includes('spindleload')) {
        const spindleload = { name: 'Spindle Load', data: data.map((d) => d.spindleload) };
        series.push(spindleload);
      }

      if (l.includes('toolgroupid')) {
        const toolgroupid = { name: 'Tool Group ID', data: data.map((d) => d.toolgroupid) };
        series.push(toolgroupid);
      }

      if (l.includes('toollifecounter')) {
        const toollifecounter = { name: 'Tool Life Counter', data: data.map((d) => d.toollifecounter) };
        series.push(toollifecounter);
      }

      if (l.includes('partcounter')) {
        const partcounter = { name: 'Part Counter', data: data.map((d) => d.partcounter) };
        series.push(partcounter);
      }

      if (l.includes('powerontime')) {
        const powerontime = { name: 'Power On Time', data: data.map((d) => {if(d.powerontime){parseInt(d.powerontime)}} ) };
        series.push(powerontime);
      }

      if (l.includes('alarm0')) {
        const alarm0 = { name: 'Alarm0', data: data.map((d) => d.alarm0) };
        series.push(alarm0);
      }

      if (l.includes('alarm1')) {
        const alarm1 = { name: 'Alarm1', data: data.map((d) => d.alarm1) };
        series.push(alarm1);
      }

      if (l.includes('alarm2')) {
        const alarm2 = { name: 'Alarm2', data: data.map((d) => d.alarm2) };
        series.push(alarm2);
      }

      if (l.includes('alarm3')) {
        const alarm3 = { name: 'Alarm3', data: data.map((d) => d.alarm3) };
        series.push(alarm3);
      }

      if (l.includes('alarm4')) {
        const alarm4 = { name: 'Alarm4', data: data.map((d) => d.alarm4) };
        series.push(alarm4);
      }

      if (l.includes('alarm5')) {
        const alarm5 = { name: 'Alarm5', data: data.map((d) => d.alarm5) };
        series.push(alarm5);
      }

      if (l.includes('alarm6')) {
        const alarm6 = { name: 'Alarm6', data: data.map((d) => d.alarm6) };
        series.push(alarm6);
      }

      if (l.includes('alarm7')) {
        const alarm7 = { name: 'Alarm7', data: data.map((d) => d.alarm7) };
        series.push(alarm7);
      }

      if (l.includes('alarm8')) {
        const alarm8 = { name: 'Alarm8', data: data.map((d) => d.alarm8) };
        series.push(alarm8);
      }

      if (l.includes('alarm9')) {
        const alarm9 = { name: 'Alarm9', data: data.map((d) => d.alarm9) };
        series.push(alarm9);
      }

      if (l.includes('alarm10')) {
        const alarm10 = { name: 'Alarm10', data: data.map((d) => d.alarm10) };
        series.push(alarm10);
      }

      if (l.includes('alarm11')) {
        const alarm11 = { name: 'Alarm11', data: data.map((d) => d.alarm11) };
        series.push(alarm11);
      }

      if (l.includes('alarm12')) {
        const alarm12 = { name: 'Alarm12', data: data.map((d) => d.alarm12) };
        series.push(alarm12);
      }

      if (l.includes('alarm13')) {
        const alarm13 = { name: 'Alarm13', data: data.map((d) => d.alarm13) };
        series.push(alarm13);
      }

      if (l.includes('alarm14')) {
        const alarm14 = { name: 'Alarm14', data: data.map((d) => d.alarm14) };
        series.push(alarm14);
      }

      if (l.includes('axesno')) {
        const axesno = { name: 'AxesNo', data: data.map((d) => d.axesno) };
        series.push(axesno);
      }

      if (l.includes('onoff')) {
        const onoff = { name: 'OnOff', data: data.map((d) => d.onoff) };
        series.push(onoff);
      }

      if (l.includes('ncprogno')) {
        const ncprogno = { name: 'NCProgNo', data: data.map((d) => d.ncprogno) };
        series.push(ncprogno);
      }

      if (l.includes('ncmainprogno')) {
        const ncmainprogno = { name: 'NCMainProgNo', data: data.map((d) => d.ncmainprogno) };
        series.push(ncmainprogno);
      }

      if (l.includes('spindleno')) {
        const spindleno = { name: 'SpindleNo', data: data.map((d) => d.spindleno) };
        series.push(spindleno);
      }

      if (l.includes('operationmode')) {
        const operationmode = { name: 'OperationMode', data: data.map((d) => d.operationmode) };
        series.push(operationmode);
      }

      if (l.includes('servocurrent1')) {
        const servocurrent1 = { name: 'ServoCurrent1', data: data.map((d) => d.servocurrent1) };
        series.push(servocurrent1);
      }

      if (l.includes('servocurrent2')) {
        const servocurrent2 = { name: 'ServoCurrent2', data: data.map((d) => d.servocurrent2) };
        series.push(servocurrent2);
      }

      if (l.includes('servocurrent3')) {
        const servocurrent3 = { name: 'ServoCurrent3', data: data.map((d) => d.servocurrent3) };
        series.push(servocurrent3);
      }

      if (l.includes('servocurrent4')) {
        const servocurrent4 = { name: 'ServoCurrent4', data: data.map((d) => d.servocurrent4) };
        series.push(servocurrent4);
      }

      if (l.includes('servocurrent5')) {
        const servocurrent5 = { name: 'ServoCurrent5', data: data.map((d) => d.servocurrent5) };
        series.push(servocurrent5);
      }

      if (l.includes('servomotorspeed1')) {
        const servomotorspeed1 = { name: 'ServoMotorSpeed1', data: data.map((d) => d.servomotorspeed1) };
        series.push(servomotorspeed1);
      }

      if (l.includes('servomotorspeed2')) {
        const servomotorspeed2 = { name: 'ServoMotorSpeed2', data: data.map((d) => d.servomotorspeed2) };
        series.push(servomotorspeed2);
      }

      if (l.includes('servomotorspeed3')) {
        const servomotorspeed3 = { name: 'ServoMotorSpeed3', data: data.map((d) => d.servomotorspeed3) };
        series.push(servomotorspeed3);
      }

      if (l.includes('servomotorspeed4')) {
        const servomotorspeed4 = { name: 'ServoMotorSpeed4', data: data.map((d) => d.servomotorspeed4) };
        series.push(servomotorspeed4);
      }

      if (l.includes('servomotorspeed5')) {
        const servomotorspeed5 = { name: 'ServoMotorSpeed5', data: data.map((d) => d.servomotorspeed5) };
        series.push(servomotorspeed5);
      }

      if (l.includes('temp')) {
        const temp = { name: 'Temp', data: data.map((d) => d.temp) };
        series.push(temp);
      }

      if (l.includes('gcodegroupno')) {
        const gcodegroupno = { name: 'GcodeGroupNo', data: data.map((d) => d.gcodegroupno) };
        series.push(gcodegroupno);
      }

      if (l.includes('gcodeflag')) {
        const gcodeflag = { name: 'GcodeFlag', data: data.map((d) => d.gcodeflag) };
        series.push(gcodeflag);
      }
    }
    );

    setSeries(series);

  }

  return (
    <DashboardContainer>
      {/* <h1>Dashboard</h1> */}
      <Labels data={data[data.length - 1]} />
      <ChartContainer>
        <Chart data={data} series={series} />
        <CheckBoxContainer>  
        {values.map((val) => (
            <Stack
              direction={'row'}
              alignItems={'center'}>
              <Checkbox
                checked={selectedLabels.includes(val.key)}
                onChange={() => handleLabelChange(val.key)}></Checkbox>
              <Typography> {val.key}</Typography>
            </Stack>
          ))}
          </CheckBoxContainer>
      </ChartContainer>
      </DashboardContainer>
  );
}

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;

`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: 700px;
  overflow-y: scroll;
`;

const ChartContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width: 100%;
`;