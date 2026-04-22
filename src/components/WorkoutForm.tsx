import React, { useState, useEffect } from 'react';

interface WorkoutFormProps {
    onAdd: (date: string, distance: number) => void;
    editData: { date: string; distance: number } | null;
    onClearEdit: () => void;
}

export default function WorkoutForm({ onAdd, editData, onClearEdit }: WorkoutFormProps) {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');

    // Если мы нажали "Редактировать", заполняем форму старыми данными
    useEffect(() => {
        if (editData) {
            setDate(editData.date);
            setDistance(editData.distance.toString());
        }
    }, [editData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !distance) return;

        onAdd(date, parseFloat(distance));

        // Очищаем форму после добавления
        setDate('');
        setDistance('');
        onClearEdit(); // Сбрасываем режим редактирования у родителя
    };

    return (
        <form className="tracker-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
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
                    step="0.1"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn-ok">ОК</button>
        </form>
    );
}
