// @ts-nocheck
import { useTasks } from "@/context/taskContext";
import React, { useEffect } from "react";



const Search = () => {

    const {getTasks,getTask,serverUrl} = useTasks()
    const [search, setSearch] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [filterTask, setFilterTask] = React.useState([])
    const [tasks, setTasks] = React.useState([])
    
    const fetchTask = async () => {
        setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/api/v1/tasks`);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
    setLoading(false);
        
        
       

    }

    const handleInputChange = (e) => {
        const searchTerm = e.target.value
        setSearch(searchTerm)

        //filters the items using the task state
        const filterItems = tasks.filter((task) => task?.title.toLowerCase().includes(search.toLowerCase()))

        setFilterTask(filterItems)

    }
    useEffect(() => {
        fetchTask()
    },[search])
    
    

    return <div>
        <input type="text" value={search} onChange={handleInputChange} placeholder="type your search" />
        {
            filterTask.length === 0
                ? (<p>No tasks found</p>)
                : (
                     <ul>
            {
            filterTask.map((task) => {
                <li key={task._id}>{ task.title}</li>
            })
        }
        </ul>
                )
       }
      
  </div>;
};

export default Search;
