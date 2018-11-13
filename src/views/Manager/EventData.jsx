import React from 'react';
import {EVENTS} from "Reducers/Events";

import { FormControlLabel, Checkbox } from "@material-ui/core";

import Input from "Components/NewEvent/Input";
import RadioGroup from "Components/NewEvent/RadioGroup";
import Search from "Components/NewEvent/Search";
import Select from "Components/NewEvent/Select";
import Streamers from "Components/NewEvent/Streamers";

import { Formats } from "Root/utils/Enums";

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const hours = Array.from(new Array(12), (x, i) => ({value: i + 1, label: i + 1}));
const minutes = Array.from(new Array(4), (x, i) => ({value: 15 * i, label: 15 * i}));
const formats = Object.keys(Formats).map(x => ({value: Formats[x], label: Formats[x]}));

const EventData = ({state, handle, select, search, channels, classes}) => {


    const scopeToText = scope => {
        switch (EVENTS[scope]) {
            case EVENTS.SHARED:
                return "Viewers only";
            case EVENTS.PUBLIC:
                return "Public events";
            case EVENTS.PRIVATE:
                return "Friend events";
        }
    };

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="Event-new-data-container">
        <div className="Event-new-title">
            <DatePicker autoOk style={{marginLeft: 10}} value={state.date} onChange={handle("date")} />
            <Input classes={{input: "Event-new-data-title", container: "Event-new-title-container"}} placeholder="Event Name" value={state.name} type="text" onChange={handle("name")}/>
        </div>
        <div className="Event-new-data-content">
            <div className="Event-new-data">
                <div>
                    <Select items={hours} value={state.hours} onChange={handle("hours")} name="hours" />
                    <Select items={minutes} value={state.minutes} onChange={handle("minutes")} name="minutes" />
                    <Select items={[{value: 0, label: "AM"}, {value: 2, label: 'PM'}]} value={state.time} onChange={handle("time")} name="time" />
                </div>
                <Select style={{width: 120, margin: "10px 0px"}} items={formats} value={state.format} onChange={handle("format")} name="format" />
                <Input type="number" value={state.count} name={"Player count"} onChange={handle("count")}/>
                <FormControlLabel
                    control={<Checkbox checked={state.streaming}
                                       onChange={e => handle("streaming")({target: {value: e.target.checked}})}
                                       value="streaming"/>}
                    label="Streamed" />
                <RadioGroup row={false} onChange={handle("scope")} value={state.scope} items={Object.keys(EVENTS)}
                            valueFromItem={item => EVENTS[item]} labelFromItem={scopeToText} classes={{row: classes.row}} />
                {state.streaming &&
                <Search query={state.query} onSelect={select} onChange={search} results={channels} />
                }
            </div>
            {state.streaming && <Streamers streamers={state.streamers} />}
        </div>
        </div>
    </MuiPickersUtilsProvider>

}

export default EventData;
