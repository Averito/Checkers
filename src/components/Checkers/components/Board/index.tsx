import {FC, MouseEventHandler, useEffect, useState} from 'react'

import styles from './Board.module.scss'
import {BoardModel} from '@models/Board'
import {CellModel} from '@models/Cell'
import {Cell} from '@components/Checkers/components/Cell'

export const Board: FC = () => {
    const [board, setBoard] = useState<BoardModel>(new BoardModel())
    const [allowedCells, setAllowedCells] = useState<CellModel[]>([])
    const [selectedCell, setSelectedCell] = useState<CellModel>({} as CellModel)
    const [boardCells, setBoardCells] = useState<CellModel[]>(board.cells)

    const boardReset: MouseEventHandler<HTMLButtonElement> = () => {
        const newBoard = new BoardModel()

        setBoard(newBoard)
        setAllowedCells([])
        setSelectedCell({} as CellModel)
    }

    const selectChecker = (newSelectedCell: CellModel) => {
        setSelectedCell(newSelectedCell)
    }

    const selectCell = (newAllowedCells: CellModel[]) => {
        setAllowedCells(newAllowedCells)
    }

    useEffect(() => {
        setBoardCells(board.cells)
    }, [board])

    const queue = board.queue === 'white' ? 'Белые' : 'Чёрные'

    return (
        <div>
            <div className={styles.counter}>
                <p>Белых: {board.whiteCount}</p>
                <button className={styles.reset} onClick={boardReset}>Рестарт</button>
                <p>Чёрных: {board.blackCount}</p>
            </div>
            <div className={styles.board}>
                {boardCells.map((cell, idx) => {
                    const cellReverse = !!(cell.y % 2)
                    const isOdd = !!((idx + 1) % 2)

                    return (
                        <Cell
                            key={cell.id}
                            cell={cell}
                            allowedCells={allowedCells}
                            selectedCell={selectedCell}
                            cellReverse={cellReverse}
                            isOdd={isOdd}
                            isEven={!isOdd}
                            queue={board.queue}
                            selectCell={selectCell}
                            selectChecker={selectChecker}
                        />
                    )
                })}
            </div>
            <div className={styles.queue}>
                <p>Ходят: {queue}</p>
            </div>
        </div>
    )
}
