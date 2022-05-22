const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
} = require("../lib/notes");
const notesArray = require("../data/db.json");
jest.mock('fs');

test("creates an note array", () => {
    const note = createNewNote(
        { title: "Darlene", text: "jhgdja3ng2" },
        notesArray
    );

    expect(note.title).toBe("Darlene");
    expect(note.text).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingNotes = [
        {
            id: "3",
            title: "Erica",
            text: "gorilla"
        },
        {
            id: "4",
            title: "Noel",
            text: "bear",
        }
    ];

    const updatedNotes = filterByQuery({ text: "gorilla" }, startingNotes);

    expect(updatedNotes.length).toEqual(1);
});

test("finds by id", () => {
    const startingNotes = [
        {
            id: "3",
            title: "Erica",
            text: "gorilla"
        },
        {
            id: "4",
            title: "Noel",
            text: "bear",
        }
    ];

    const result = findById("3", startingNotes);

    expect(result.title).toBe("Erica");
});

test("validates note", () => {
    const note =  {
        id: "3",
        title: "Erica",
        text: "gorilla"
    };

    const invalidNote =  {
        id: "4",
        title: "Noel"
    };

    const result = validateNote(note);
    const result2 = validateNote(invalidNote);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});