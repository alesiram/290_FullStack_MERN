import React from 'react';
import {MdDeleteOutline, MdOutlineEdit} from 'react-icons/md';

function Exercise({ exercises, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercises.name}</td>
            <td>{exercises.reps}</td>
            <td>{exercises.weight}</td>
            <td>{exercises.unit}</td>
            <td>{exercises.date.substring(0,10)}</td>
            <td><MdOutlineEdit onClick={() => onEdit(exercises)} /></td>
            <td><MdDeleteOutline onClick={() => onDelete(exercises._id)} /></td>
        </tr>
    )
}

export default Exercise;