import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';
import WorkoutList, { Workout } from './WorkoutList';

export default function StepsTracker() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [editData, setEditData] = useState<Workout | null>(null);

    const handleAddWorkout = (date: string, distance: number) => {
        setWorkouts((prevWorkouts) => {
            const existingWorkout = prevWorkouts.find(w => w.date === date);
            let updatedWorkouts;

            if (existingWorkout) {
                // Если дата есть, перебираем массив через map и создаем НОВЫЙ объект для совпавшей даты
                updatedWorkouts = prevWorkouts.map(w =>
                    w.date === date
                        ? { ...w, distance: w.distance + distance }
                        : w
                );
            } else {
                // Если даты нет, просто добавляем новый объект в массив
                updatedWorkouts = [...prevWorkouts, { date, distance }];
            }

            // Сортируем и возвращаем
            return updatedWorkouts.sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        });
    };

    const handleDelete = (targetDate: string) => {
        setWorkouts((prev) => prev.filter(w => w.date !== targetDate));
    };

    const handleEdit = (targetDate: string) => {
        const targetWorkout = workouts.find(w => w.date === targetDate);
        if (targetWorkout) {
            setEditData(targetWorkout); // Передаем данные в форму
            handleDelete(targetDate);   // Удаляем из списка
        }
    };

    return (
        <div className="tracker-container">
            {/* Дочерний компонент 1: Форма ввода */}
            <WorkoutForm
                onAdd={handleAddWorkout}
                editData={editData}
                onClearEdit={() => setEditData(null)}
            />

            {/* Дочерний компонент 2: Отображение данных */}
            <WorkoutList
                workouts={workouts}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}
