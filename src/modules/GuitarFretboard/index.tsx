import React, { useState, useContext } from 'react';
import { Note } from 'types/notes';
import { convertToOpenNote } from 'utils/notes';
import AppContext from 'AppContext';
import OpenNoteSelector from './OpenNoteSelector';
import FretboardContext, { contextInitialValue } from './FretboardContext';
import FretNotes from './FretNotes';

// for (var i = 0; i < notes.e.length; i++) {
//   $(".mask.low-e ul").append(
//     "<li note=" + notes.e[i] + ">" + notes.e[i] + "</li>",
//   );
//   $(".mask.a ul").append("<li note=" + notes.a[i] + ">" + notes.a[i] + "</li>");
//   $(".mask.d ul").append("<li note=" + notes.d[i] + ">" + notes.d[i] + "</li>");
//   $(".mask.g ul").append("<li note=" + notes.g[i] + ">" + notes.g[i] + "</li>");
//   $(".mask.b ul").append("<li note=" + notes.b[i] + ">" + notes.b[i] + "</li>");
//   $(".mask.high-e ul").append(
//     "<li note=" + notes.e[i] + ">" + notes.e[i] + "</li>",
//   );
// }

// $(".controls a.down").click(function () {
//   if (!canClick) {
//     return false;
//   }
//   canClick = false;

//   $(".mask").each(function () {
//     var el = $(this);
//     var nextNote = el.find("li:nth-child(12)").text();

//     el.animate({ right: -268 }, slideSpeed);
//     setTimeout(function () {
//       el.find("ul").prepend("<li note=" + nextNote + ">" + nextNote + "</li>");
//       el.find("li:last-child").remove();
//       el.css({ right: -189 });
//     }, slideSpeed + 20);
//   });

//   setTimeout(function () {
//     changeOpenNotes();
//     showNotes(noteToShow);
//     canClick = true;
//   }, slideSpeed + 20);

//   return false;
// });

// $(".controls a.up").click(function () {
//   if (!canClick) {
//     return false;
//   }
//   canClick = false;

//   $(".mask").each(function () {
//     var el = $(this);
//     var nextNote = el.find("li:nth-child(2)").text();

//     $("<li note=" + nextNote + ">" + nextNote + "</li>").appendTo(
//       el.find("ul"),
//     );
//     el.css({ right: -268 });
//     el.find("li:first-child").remove();
//     el.animate({ right: -189 }, slideSpeed);
//   });

//   changeOpenNotes();
//   showNotes(noteToShow);

//   setTimeout(function () {
//     canClick = true;
//   }, slideSpeed + 20);
//   return false;
// });

// $(".controls li").click(function () {
//   noteToShow = $(this).text();
//   showNotes(noteToShow);
// });

// function showNotes(noteToShow) {
//   if (noteToShow == "All") {
//     $(".guitar-neck .notes li").animate({ opacity: 1 }, 500);
//   } else {
//     $(".guitar-neck .notes li")
//       .not('[note="' + noteToShow + '"]')
//       .animate({ opacity: 0 }, 500);
//     $('.guitar-neck .notes li[note="' + noteToShow + '"]').animate(
//       { opacity: 1 },
//       500,
//     );
//   }
// }

// function changeOpenNotes() {
//   $(".notes .mask").each(function () {
//     var el = $(this);
//     var elClass = el.attr("class").split(" ")[1];
//     var note = el.find("li:last-child").text();

//     $(".open-notes ." + elClass).text(note);
//   });
// }

type Props = {
  showAllNotes?: boolean;
  frets?: number;
};

const GuitarFretboard: React.FC<Props> = ({ showAllNotes, frets = 19 }) => {
  const [openNotes, setOpenNotes] = useState(contextInitialValue.openNotes);
  const { addNote } = useContext(AppContext);

  function setOpenNote(note: Note, guitarString: number): void {
    setOpenNotes((currentOpenNotes) => ({
      ...currentOpenNotes,
      [guitarString]: convertToOpenNote(note),
    }));
  }

  function handleNoteClick(noteNumber: number, guitarString: number): void {
    addNote({ noteNumber, guitarString });
  }

  return (
    <FretboardContext.Provider
      value={{
        openNotes,
        setOpenNotes: setOpenNote,
      }}
    >
      <div className="guitar-neck-scrollable-wrapper">
        <div className="guitar-neck-wrapper">
          <div className="guitar-neck">
            <div className="fret first">
              <span>0</span>
            </div>
            {[...Array(frets + 1)].map((_, idx) => (
              <div className="fret" key={idx}>
                <span>{idx + 1}</span>
              </div>
            ))}

            <ul className="dots">
              <li />
              <li />
              <li />
              <li />
            </ul>
            <ul className="strings">
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>

            <ul className="open-notes">
              <OpenNoteSelector defaultNote={openNotes[1]} guitarString={1} />
              <OpenNoteSelector defaultNote={openNotes[2]} guitarString={2} />
              <OpenNoteSelector defaultNote={openNotes[3]} guitarString={3} />
              <OpenNoteSelector defaultNote={openNotes[4]} guitarString={4} />
              <OpenNoteSelector defaultNote={openNotes[5]} guitarString={5} />
              <OpenNoteSelector defaultNote={openNotes[6]} guitarString={6} />
            </ul>
            <div className="notes">
              <FretNotes onNoteClick={handleNoteClick} frets={frets} />
            </div>
          </div>
        </div>
      </div>
    </FretboardContext.Provider>
  );
};
export default GuitarFretboard;