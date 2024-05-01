import { Box, Flex, Text, Button, Input, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const toast = useToast();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
  }, []);

  const addNote = () => {
    const newNote = { id: Date.now(), text: "" };
    setNotes([...notes, newNote]);
    setEditId(newNote.id);
    setEditText("");
  };

  const saveNote = (id) => {
    const updatedNotes = notes.map(note => note.id === id ? { ...note, text: editText } : note);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEditId(null);
    toast({
      title: "Note saved.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    toast({
      title: "Note deleted.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" p={4}>
      <Button onClick={addNote} leftIcon={<FaEdit />} colorScheme="teal" mb={4}>
        Add Note
      </Button>
      {notes.map(note => (
        <Flex key={note.id} mb={2}>
          {editId === note.id ? (
            <Input value={editText} onChange={(e) => setEditText(e.target.value)} placeholder="Type here..." />
          ) : (
            <Text flex="1">{note.text}</Text>
          )}
          {editId === note.id ? (
            <Button onClick={() => saveNote(note.id)} colorScheme="green" ml={2}>
              <FaSave />
            </Button>
          ) : (
            <Button onClick={() => { setEditId(note.id); setEditText(note.text); }} colorScheme="blue" ml={2}>
              <FaEdit />
            </Button>
          )}
          <Button onClick={() => deleteNote(note.id)} colorScheme="red" ml={2}>
            <FaTrash />
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};

export default Notes;