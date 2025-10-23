import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";

function navigation() {
    return (
        <nav>
            <Link className="/" to='/'>
                <FaHome size={53} /> <label><br></br>Home</label>
            </Link>
            <Link className="add-exercise" to='/add-exercise'>
                <FaPlus size={53} /> <label><br></br>New workout</label>
       
            </Link>
        </nav>
    );
}


export default navigation;

