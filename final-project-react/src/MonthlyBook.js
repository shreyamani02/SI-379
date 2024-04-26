import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './MonthlyBook.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';


function MonthlyBook() {
    return(
        <div id = "monthlybook">
            <h2>Emily Henry: <i>Happy Place</i></h2>
            <div id = "description">
                <div id = "image-section">
                    <TransformWrapper>
                        <TransformComponent>
                            <img src = "https://m.media-amazon.com/images/I/71OS-CG85lL._AC_UF1000,1000_QL80_DpWeblab_.jpg" alt = "Happy Place"/>
                        </TransformComponent>
                     </TransformWrapper>
                </div>
                <div id = "written-description">
                    <p><b><i>#1 on the New York Times and Sunday Times Best Seller List</i></b></p>
                    <p>A couple who broke up months ago pretend to still be together for their annual weeklong vacation with their best friends. Harriet and Wyn have been the perfect couple since they met in college—they go together like salt and pepper, honey and tea, lobster and rolls. Except, now—for reasons they’re still not discussing—they don’t.</p>
                    <a href="https://www.goodreads.com/en/book/show/61718053" target="_blank" rel="noopener noreferrer">
                        <button>Find Review on Goodreads</button>
                    </a>
                    <a href="https://www.penguinrandomhouse.com/books/704944/happy-place-by-emily-henry/9780593441275/readers-guide/" target="_blank" rel="noopener noreferrer">
                        <button>Book Club Reading Guide</button>
                    </a>
                </div>
            </div>
        </div>
    );
}
export default MonthlyBook;
 