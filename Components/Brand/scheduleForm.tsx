import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export type ScheduleFormData = {
    description: string,
    publicationDate: string,
    publicationTime: string
}

type Props = {
    onSubmitForm(data: ScheduleFormData): void;
};

export const ScheduleForm: React.FunctionComponent<Props> = ({ onSubmitForm }) => {
    const { handleSubmit, register, setValue } = useForm<ScheduleFormData>();

    return (
        <form onSubmit={handleSubmit((publicationData) => onSubmitForm(publicationData))}>
            <label>
                Descripción{" "}
                <input {...register("description", { required: true })} type="text" />
            </label>
            <label>
                Fecha{" "}
                <input {...register("publicationDate", { required: true })} type="date" />
            </label>
            <label>
                Hora{" "}
                <input {...register("publicationTime", { required: true })} type="time" />
            </label>
            <input type="submit" value="Programar" />
        </form>
    );
};