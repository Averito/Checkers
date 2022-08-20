import {FC, MouseEventHandler} from 'react'
import classNames from 'classnames'

import styles from './Checker.module.scss'
import {CellModel} from '@models/Cell'

interface CheckerProps {
    cell: CellModel,
    onClick: MouseEventHandler<HTMLDivElement>
}

export const Checker: FC<CheckerProps> = ({cell, onClick}) => {
    const team = cell?.checker?.team === 'black' ? styles.black : styles.white
    const checkerSelected = cell?.checker?.selected ? styles.selected : ''

    return <div className={classNames(styles.checker, team, checkerSelected)} onClick={onClick}/>
}
