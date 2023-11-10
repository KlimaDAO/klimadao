import { cx } from "@emotion/css";
import { TextField } from "@mui/material";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { SimpleProjectCard } from "components/SimpleProjectCard";
import { Modal } from "components/shared/Modal";
import { Project } from "lib/types/carbonmark.types";
import { FC, useState, } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as styles from "./styles";


type Props = { open?: boolean, estimate: number, address?: string, projects: Project[] }

export const RetireModal: FC<Props> = (props) => {
    const [project, setProject] = useState<Project>();
    const { handleSubmit, control } = useForm({
        mode: "onChange",
    });

    const price = Number(project?.price ?? 0);

    const onSubmit: SubmitHandler<any> = (values) => {
        const body = {
            ...values,
            quantity: props.estimate,
            tokenAddress: props.address,
        };
        fetch("/api/retirement-demo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    };

    return <Modal title="Offset" showModal={!!props.open} closeOnBackgroundClick>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.projectOptions}>
                {props.projects.map((p) => (
                    <SimpleProjectCard
                        key={p.key}
                        project={p}
                        className={cx(styles.card, {
                            [styles.selectedCard]: p.key === project?.key,
                        })}
                        onClick={() => setProject(p)}
                    />
                ))}
            </div>

            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: 300 }}
                        id="name"
                        size="small"
                        type="text"
                        label="Your Name"
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: 300 }}
                        id="email"
                        size="small"
                        type="email"
                        label="Your Email"
                    />
                )}
            />
            <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: 300 }}
                        id="message"
                        size="small"
                        type="text"
                        label="Why are you offsetting?"
                    />
                )}
            />
            <div>
                <b>Offset Cost:</b> ${(price * props.estimate).toFixed(2)} USD
            </div>
            <ButtonPrimary
                // disabled={isNil()}
                label={`Offset`}
                type="submit"
                className={styles.button}
            />
        </form>
    </Modal>

}