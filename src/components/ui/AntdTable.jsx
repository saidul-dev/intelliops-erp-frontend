import React, { createContext, useEffect, useState, useContext } from "react";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import { Table } from "antd";

/* ================= DRAG CONTEXT ================= */
const DragContext = createContext({ active: null, over: null });

/* ================= DRAG STYLE ================= */
const getDragStyle = (dragState, id) => {
    const { active, over } = dragState;

    if (active === id) {
        return { background: "#fafafa", opacity: 0.6 };
    }

    if (over === id && active !== over) {
        return { borderLeft: "2px dashed #1677ff" };
    }

    return {};
};

/* ================= HEADER CELL ================= */
const HeaderCell = (props) => {
    const dragState = useContext(DragContext);

    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: props.id,
    });

    return (
        <th
            {...props}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                cursor: "move",
                ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
                ...props.style,
                ...getDragStyle(dragState, props.id),
            }}
        />
    );
};

/* ================= BODY CELL ================= */
const BodyCell = (props) => {
    const dragState = useContext(DragContext);

    return (
        <td
            {...props}
            style={{
                ...props.style,
                ...getDragStyle(dragState, props.id),
            }}
        />
    );
};

/* ================= MAIN TABLE ================= */
const AntdTable = ({
    columns = [],
    data = [],
    loading = false,

    isPagination = false,
    pagination = {},

    setQuery = () => { },

    isSlNo = true,

    expandable = true,
}) => {
    const [dragState, setDragState] = useState({ active: null, over: null });
    const [tableColumns, setTableColumns] = useState([]);

    /* ================= SL NO COLUMN ================= */
    const slNoColumn = {
        title: "SL No",
        dataIndex: "sl_no",
        key: "sl_no",
        render: (_, __, index) => {
            const currentPage = pagination?.current_page || 1;
            const perPage = pagination?.per_page || 10;
            return (currentPage - 1) * perPage + index + 1;
        },
    };

    /* ================= INIT COLUMNS ================= */
    useEffect(() => {
        let cols = columns.map((col, index) => ({
            ...col,
            key: col.key || `${index}`,
            onHeaderCell: () => ({ id: col.key || `${index}` }),
            onCell: () => ({ id: col.key || `${index}` }),
        }));

        if (isSlNo) {
            cols = [slNoColumn, ...cols];
        }

        setTableColumns(cols);
    }, [columns, isSlNo, pagination]);

    /* ================= DND ================= */
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const onDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;

        setTableColumns((prev) => {
            const oldIndex = prev.findIndex((c) => c.key === active.id);
            const newIndex = prev.findIndex((c) => c.key === over.id);
            return arrayMove(prev, oldIndex, newIndex);
        });

        setDragState({ active: null, over: null });
    };

    const onDragOver = ({ active, over }) => {
        if (!over) return;

        setDragState({
            active: active.id,
            over: over.id,
        });
    };

    /* ================= PAGINATION ================= */
    const handleTableChange = (pagination) => {
        setQuery((prev) => ({
            ...prev,
            page: pagination.current,
            per_page: pagination.pageSize,
        }));
    };

    const paginationConfig =
        isPagination && pagination
            ? {
                current: pagination.current_page || 1,
                pageSize: pagination.per_page || 10,
                total: pagination.total || 0,
                showSizeChanger: true,
            }
            : false;

    return (
        <DndContext
            sensors={sensors}
            modifiers={[restrictToHorizontalAxis]}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >
            <SortableContext
                items={tableColumns.map((c) => c.key)}
                strategy={horizontalListSortingStrategy}
            >
                <DragContext.Provider value={dragState}>
                    <Table
                        rowKey={(record) => record.id || record.key}
                        columns={tableColumns}
                        dataSource={data}
                        loading={loading}
                        pagination={paginationConfig}
                        onChange={handleTableChange}
                        expandable={
                            expandable
                                ? { childrenColumnName: "children" }
                                : undefined
                        }
                        components={{
                            header: { cell: HeaderCell },
                            body: { cell: BodyCell },
                        }}
                    />
                </DragContext.Provider>
            </SortableContext>

            {/* Drag Preview */}
            <DragOverlay>
                <th style={{ background: "#fafafa", padding: 10 }}>
                    {
                        tableColumns.find(
                            (c) => c.key === dragState.active
                        )?.title
                    }
                </th>
            </DragOverlay>
        </DndContext>
    );
};

export default AntdTable;