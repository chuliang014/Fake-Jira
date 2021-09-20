import { React, useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject } from "utils";
import qs from "qs";
import { useMount, useDebounce } from "utils";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  const debouncedParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  useEffect(() => { 
    fetch(
      `${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiURL}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};
