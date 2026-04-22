import React from 'react';

// Выносим интерфейс отдельно, чтобы использовать его в разных файлах
export interface Workout {
    date: string;
    distance: number;
}

interface WorkoutListProps {
    workouts: Workout[];
    onDelete: (date: string) => void;
    onEdit: (date: string) => void;
}

export default function WorkoutList({ workouts, onDelete, onEdit }: WorkoutListProps) {
    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year.slice(-2)}`;
    };

    return (
        <div className="tracker-list-container">
            <div className="list-header">
                <span>Дата (ДД.ММ.ГГ)</span>
                <span>Пройдено км</span>
                <span>Действия</span>
            </div>

            <div className="list-body">
                {workouts.map((workout) => (
                    <div className="list-row" key={workout.date}>
                        <span>{formatDate(workout.date)}</span>
                        <span>{workout.distance.toFixed(1)}</span>
                        <div className="actions">
                            <button
                                className="action-btn edit-btn"
                                onClick={() => onEdit(workout.date)}
                                title="Редактировать"
                            >
                                ✎
                            </button>
                            <button
                                className="action-btn delete-btn"
                                onClick={() => onDelete(workout.date)}
                                title="Удалить"
                            >
                                ✘
                            </button>
                        </div>
                    </div>
                ))}
                {workouts.length === 0 && (
                    <div className="empty-msg">Нет записей. Добавьте свою первую тренировку!</div>
                )}
            </div>
        </div>
    );
}
