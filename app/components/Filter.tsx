import React from "react";

import { Dropdown } from "primereact/dropdown";

const Filter = ({
  data,
  selectedFilter,
  setSelectedFilter,
  handleChange,
}: any) => {
  return (
    <div className="flex justify-end items-end mr-28 mb-5">
      <Dropdown
        value={selectedFilter}
        onChange={handleChange}
        options={data}
        optionLabel="name"
        placeholder="Эрэмбэлж харах "
        className="w-[250px] text-[14px]"
      />
    </div>
  );
};

export default Filter;
