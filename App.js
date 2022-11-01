import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            // const stats = {bestScore: count, totalScore: count, numGames: 1}
            // console.log("local stats", JSON.stringify(stats))

            // if(localStorage.getItem("gameStats") === null){
            //     localStorage.setItem("gameStats", JSON.stringify(stats))
            //     return
            // }
            // console.log("code reached here")
            
            // const prevStats = JSON.parse(localStorage.getItem("gameStats"))
            // console.log("prevStats", prevStats)
            // prevStats = {
            //     ...prevStats, 
            //     totalScore: prevStats.totalScore + count, 
            //     numGames : prevStats.numGames + 1
            //     }
            // console.log("updated stats", prevStats)
            // console.log(count)
            // if(count < prevStats.bestScore){
            //     prevStats = {...prevStats, bestScore:count}
            // }
            // localStorage.setItem("gameStats", JSON.stringify(prevStats))
            // const p = JSON.parse(localStorage.getItem("gameStats"))
            // console.log("stats till now: ", p)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setCount(count + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setCount(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    
    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            {tenzies  && <div className= "num--rolls"> Number of Rolls: {count}</div>}
        </main>
    )
}