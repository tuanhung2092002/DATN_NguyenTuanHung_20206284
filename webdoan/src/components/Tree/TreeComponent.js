import React, { useState } from "react";
import TreeNode from "./TreeNode";

const TreeComponent = ({ data, handleNodeClick }) => {

    return (
        <div>
            {Array.isArray(data) && data.map((node, i) => (
                <TreeNode key={i} node={node} onNodeClick={handleNodeClick} />
            ))}
        </div>
    );
};

export default React.memo(TreeComponent);
