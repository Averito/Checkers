import {FC, MouseEventHandler, useMemo} from 'react'
import classNames from 'classnames'

import styles from './Cell.module.scss'
import {CellModel} from '@models/Cell'
import {Checker} from '@components/Checkers/components/Checker'

interface CellProps {
    cell: CellModel
    cellReverse: boolean
    isOdd: boolean
    isEven: boolean
    allowedCells: CellModel[]
    selectedCell: CellModel
    selectCell: (newAllowedCells: CellModel[]) => void
    selectChecker: (newSelectedCell: CellModel) => void
}

export const Cell: FC<CellProps> = ({
                                        cell,
                                        cellReverse,
                                        selectedCell,
                                        allowedCells,
                                        selectCell,
                                        selectChecker,
                                        isOdd,
                                        isEven
                                    }) => {
    const allowedCell = useMemo<boolean>(() => allowedCells.some(allowedCell => allowedCell.id === cell.id) && !cell.checker, [cell, allowedCells])

    const onSelectCell: MouseEventHandler<HTMLDivElement> = () => {
        if (!allowedCell) return

        const newAllowedCellsAndSelectedCell = selectedCell?.moveTo(
            allowedCells,
            cell
        )

        const newAllowedCells = newAllowedCellsAndSelectedCell?.newAllowedCells
        const newSelectedCell = newAllowedCellsAndSelectedCell?.selectedCell

        selectCell(newAllowedCells ?? [])
        selectChecker(newSelectedCell ?? ({} as CellModel))
    }

    const onSelectChecker: MouseEventHandler<HTMLDivElement> = () => {
        const newSelectedCell = cell.select()
        if (!newSelectedCell) return

        const allowedCells = cell.findPlaces()

        selectChecker(newSelectedCell ?? ({} as CellModel))
        selectCell(allowedCells)
    }

    const cursorPointer = selectedCell?.id && !cell?.checker?.id
        ? styles.cursorPointer
        : styles.cursorDefault

    const evenCellBackground = isEven ? styles.backgroundBlack : styles.backgroundWhite
    const oddCellBackground = isOdd ? styles.backgroundBlack : styles.backgroundWhite

    return (
        <div className={classNames(styles.cell, cellReverse ? oddCellBackground : evenCellBackground, cursorPointer)}
             onClick={onSelectCell}>
            {allowedCell && <span className={styles.allowed}/>}
            {cell?.checker && (
                <Checker cell={cell} onClick={onSelectChecker}/>
            )}
        </div>
    )
}
