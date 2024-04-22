import React, { useState } from "react";
import { Row, Col, Table } from "antd";

const data = [
  { key: "1", name: "Action" },
  { key: "2", name: "Adventure" },
  { key: "3", name: "Role-playing" },
  { key: "4", name: "Simulation" },
  { key: "5", name: "Strategy" },
  { key: "6", name: "Sports" },
  { key: "7", name: "Puzzle" },
  { key: "8", name: "Shooter" },
  { key: "9", name: "Racing" },
  { key: "10", name: "Platformer" },
  { key: "11", name: "Fighting" },
  { key: "12", name: "Massively Multiplayer" },
  { key: "13", name: "Family" },
  { key: "14", name: "Educational" },
  { key: "15", name: "Indie" },
  { key: "16", name: "Arcade" },
  { key: "17", name: "Card" },
  { key: "18", name: "Casual" },
  { key: "19", name: "Music" },
];

const Genres = () => {
  const col1 = data.slice(0, 7);
  const col2 = data.slice(7, 14);
  const col3 = data.slice(14, 19);

  const columnsData = [
    { key: "1", data: col1 },
    { key: "2", data: col2 },
    { key: "3", data: col3 },
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);

  // Function to handle genre selection
  const handleGenreSelect = (selectedGenre) => {
    if (!selectedGenres.includes(selectedGenre)) {
      setSelectedGenres([...selectedGenres, selectedGenre]);
    }
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedGenreNames = selectedRows.map((row) => row.name);
      setSelectedGenres(selectedGenreNames);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
    hideSelectAll: true, // Hide the "Select All" checkbox
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {columnsData.map((columnData) => (
          <Col key={columnData.key} span={8}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={[
                {
                  title: "Genre Name",
                  dataIndex: "name",
                  render: (text) => (
                    <a onClick={() => handleGenreSelect(text)}>{text}</a>
                  ),
                },
              ]}
              dataSource={columnData.data}
              pagination={false}
            />
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: "20px" }}>
        <strong>Selected Genres:</strong> {selectedGenres.join(", ")}
      </div>
    </div>
  );
};

export default Genres;
