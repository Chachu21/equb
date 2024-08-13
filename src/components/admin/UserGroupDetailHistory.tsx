import React, { useState, useEffect } from "react";
import SearchUi from "../UI/SearchUi";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Tables from "../UI/Tables";
import { backend_url } from "../../constant";

interface Header {
  id: string;
  title: string;
}

interface Datas {
  _id: string;
  status: string;
  name: string;
  members: string;
  winners: string;
  amount: string;
  member: string;
  isCompleted: boolean;
}

const UserGroupDetailHistory: React.FC = () => {
  const [filteredUserGroup, setFilteredUsergroup] = useState<Datas[]>([]);
  const [userGroups, setUserGroups] = useState<Datas[]>([]);
  const userData = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const userId = userData?._id;
        const response = await axios.get<Datas[]>(
          `${backend_url}/api/v1/group/userJoinedGroups/${userId}`
        );
        setUserGroups(response.data);
      } catch (error) {
        console.error("Error fetching user's joined groups:", error);
      }
    };

    fetchUserGroups();
  }, [userData]);

  const filteredData = userGroups.map(
    ({ _id, name, member, members, winners, amount, status, isCompleted }) => ({
      _id,
      status,
      name,
      members,
      winners,
      amount,
      member,
      isCompleted,
    })
  );

  const header: Header[] = [
    { id: "1", title: "GroupId" },
    { id: "2", title: "Status" },
    { id: "3", title: "GroupName" },
    { id: "4", title: "Members" },
    { id: "5", title: "Winners" },
    { id: "6", title: "Amount" },
    { id: "7", title: "Member" },
    { id: "8", title: "IsCompleted" },
  ];

  const handleSearch = (searchTerm: string) => {
    const filteredResults = filteredData.filter((data) =>
      data.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsergroup(filteredResults);
  };

  const handleDelete = async (groupId: string) => {
    try {
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.delete(
        `${backend_url}/api/v1/group/${groupId}`,
        config
      );
      setUserGroups(userGroups.filter((group) => group._id !== groupId));
      setFilteredUsergroup(
        filteredUserGroup.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("Error deleting user group:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">
        User Group Detail History
      </h1>
      <SearchUi handleSearch={handleSearch} search={"name"} />
      <Tables
        header={header}
        datas={filteredUserGroup.length > 0 ? filteredUserGroup : filteredData}
        onDelete={handleDelete}
        hasDelete={true}
      />
    </div>
  );
};

export default UserGroupDetailHistory;
