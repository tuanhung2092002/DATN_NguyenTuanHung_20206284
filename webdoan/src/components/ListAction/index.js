import React, {useState} from "react";
import styles from './ListActionStyle.module.scss';
import classNames from "classnames/bind";
import ListActionTarget from "./ListActionTarget";
import ListActionAssign from "./ListActonAssign";
import ListActionCombination from "./ListActionCombination";
import ListActionFollow from "./ListActionFollow";

const cx = classNames.bind(styles);

const ListAction = (props) => {

    if(props.role === 1) return (<ListActionTarget setShowModuleCreateTask={props.setShowModuleCreateTask} task={props.task} />)
    else if(props.role === 0) return (<ListActionAssign setShowModuleCreateTask={props.setShowModuleCreateTask} task={props.task} />)
    else if(props.role === 2) return (<ListActionCombination task={props.task} />)
    else if(props.role === 3) return (<ListActionFollow task={props.task} />)
}

export default ListAction;
