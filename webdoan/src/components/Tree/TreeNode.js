import React from "react";
import classNames from "classnames/bind";
import styles from "./TreeStyle.module.scss";

const cx = classNames.bind(styles);

const ItemChild = ({ itemChild, indexChild, lengthChild, onNodeClick }) => {
    return (
        <div className={cx('list_child')} key={indexChild}>
            <div className={cx('brank_child')} style={{
                top: indexChild === 0 ? '-2px' : '-27px',
                height: indexChild === 0 ? '25px' : '50px',
            }}></div>
            {indexChild !== lengthChild && (<div className={cx('list_child_border_left')}></div>)}
            <TreeNode node={itemChild} onNodeClick={onNodeClick}/>
        </div>
    )
}

const TreeNode = ({node, onNodeClick}) => {

    const handleClick = () => {
        if (onNodeClick) {
            onNodeClick(node); // Gửi dữ liệu nhánh được click ra ngoài
        }
    };

    const [showChild, setShowChild] = React.useState(false);

    return (
        <div className={cx('item_child')}>
            <div className={cx('text_child')}>
                <div
                    className={cx('parent')}
                >
                    <div
                        className={cx('icon_arrow', 'me-2')}
                        onClick={() => setShowChild(!showChild)}
                    >
                        {showChild ? (<i className='bx bxs-down-arrow'></i>) : (<i className='bx bxs-right-arrow'></i>)}
                    </div>

                    <div
                        onClick={() => handleClick()}
                    >
                        {node.departmentName}
                    </div>
                </div>
                {node.child_departments?.length > 0 && showChild && node.child_departments.map((itemChild, indexChild) => {
                    return (
                        <ItemChild itemChild={itemChild} indexChild={indexChild} lengthChild={node.child_departments?.length - 1} onNodeClick={onNodeClick}/>
                    )
                })}
            </div>
        </div>
    )
};

export default React.memo(TreeNode);
