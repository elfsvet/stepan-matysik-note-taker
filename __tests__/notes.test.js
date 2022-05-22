const { filterByQuery, findById, createNewNote, validateNote } = require("../lib/notes");
const notesArray = require("../data/db.json");
// we will mock fs so we don't need to require it because we don't want to mess with our data in tests.
jest.mock('fs');
// all tests
test("creates an note array", () => {
    const note = createNewNote(
        { title: "Note1", text: "Text of the note" },
        notesArray
    );
    // check if it does what it supposed to
    expect(note.title).toBe("Note1");
    expect(note.text).toBe("Text of the note");
});

test("filters by query", () => {
    const startingNotes = [
        {
            id: "3",
            title: "Note Next",
            text: "Some random text"
        },
        {
            id: "4",
            title: "Note After the Next",
            text: "Another random text",
        }
    ];
    // call the function
    const updatedNotes = filterByQuery({ text: "Some random text" }, startingNotes);
    // check
    expect(updatedNotes.length).toEqual(1);
});

test("finds by id", () => {
    const startingNotes = [
        {
            id: "3",
            title: "Note Next",
            text: "Some random text"
        },
        {
            id: "4",
            title: "Note After the Next",
            text: "Another random text",
        }
    ];
    // call the function
    const result = findById("3", startingNotes);
    // check
    expect(result.title).toBe("Note Next");
});

test("validates note", () => {
    const note = {
        id: "3",
        title: "Note Next",
        text: "Some random text"
    };

    const invalidNote = {
        id: "4",
        title: "Note After the Next"
    };
    // run function
    const result = validateNote(note);
    const result2 = validateNote(invalidNote);
    // check
    expect(result).toBe(true);
    expect(result2).toBe(false);
});