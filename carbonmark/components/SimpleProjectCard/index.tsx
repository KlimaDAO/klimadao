import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { CategoryName, Project } from "lib/types/carbonmark.types";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from './styles';


export const SimpleProjectCard: FC<{ project: Project }> = (props) => {
    const { locale } = useRouter();
    return <div className={styles.card}>
        <div className={styles.cardImage}>
            <ProjectImage category={getCategoryFromProject(props.project)} />
        </div>
        <div className={styles.cardContent}>
            <Text t="h4">{formatToPrice(props.project.price, locale)}</Text>
            <Text t="h5" className={styles.cardTitle}>
                {props.project.name || "! MISSING PROJECT NAME !"}
            </Text>
            <Text t="body1" className={styles.cardDescription}>
                {props.project.short_description ||
                    props.project.description ||
                    t`No project description found`}
            </Text>
            <div className={styles.tags}>
                <Vintage vintage={props.project.vintage} />
                {props.project?.methodologies?.length > 1 ? (
                    props.project.methodologies.map((methodology, index) => (
                        <Category
                            key={`${methodology?.id}-${index}`}
                            category={methodology?.category as CategoryName}
                        />
                    ))
                ) : (
                    <Category category={getCategoryFromProject(props.project)} />
                )}
            </div>
        </div>
    </div>
}