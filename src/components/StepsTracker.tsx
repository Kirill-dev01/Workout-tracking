import React, { useState } from 'react';

export interface Workout {
    date: string;     // Дата в формате YYYY-MM-DD для удобной сортировки
    distance: number; // Дистанция (число)
}

export default function StepsTracker() {
    // Типизируем стейт как массив объектов Workout
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    // Стейты для полей формы
    const [date, setDate] = useState<string>('');
    const [distance, setDistance] = useState<string>('');

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!date || !distance) return; // Защита от пустых полей

        const distNum = parseFloat(distance);

        setWorkouts((prevWorkouts) => {
            const existingIndex = prevWorkouts.findIndex(w => w.date === date);
            const newWorkouts = [...prevWorkouts];

            if (existingIndex !== -1) {
                // Если дата уже есть — суммируем дистанцию
                newWorkouts[existingIndex].distance += distNum;
            } else {
                // Если даты нет — добавляем новую запись
                newWorkouts.push({ date, distance: distNum });
            }

            // Сортируем массив по дате (по убыванию: от новых к старым)
            return newWorkouts.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        });

        // Очищаем форму
        setDate('');
        setDistance('');
    };

    // Удаление записи
    const handleDelete = (targetDate: string) => {
        setWorkouts((prev) => prev.filter(w => w.date !== targetDate));
    };

    // Редактирование записи (дополнительное задание)
    const handleEdit = (targetDate: string) => {
        const targetWorkout = workouts.find(w => w.date === targetDate);
        if (targetWorkout) {
            // Переносим данные в форму
            setDate(targetWorkout.date);
            setDistance(targetWorkout.distance.toString());
            // Удаляем из списка, чтобы при нажатии "ОК" запись перезаписалась, а не приплюсовалась
            handleDelete(targetDate);
        }
    };

    // Вспомогательная функция для красивого вывода даты (из YYYY-MM-DD в DD.MM.YY)
    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year.slice(-2)}`; // берем последние 2 цифры года
    };

    return (
        <div className="tracker-container">
            <form className="tracker-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                    {/* Используем type="date" для удобного выбора, он возвращает YYYY-MM-DD */}
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="distance">Пройдено км</label>
                    <input
                        type="number"
                        id="distance"
                        step="0.1" // Позволяет вводить дробные числа
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-ok">ОК</button>
            </form>

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
                                    onClick={() => handleEdit(workout.date)}
                                    title="Редактировать"
                                >
                                    ✎
                                </button>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => handleDelete(workout.date)}
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
        </div>
    );
}