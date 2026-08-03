export default function EmptyState({ title, description, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            {icon && <div className="mb-4 text-4xl">{icon}</div>}

            <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">{title}</h2>

            {description && <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
        </div>
    );
}
