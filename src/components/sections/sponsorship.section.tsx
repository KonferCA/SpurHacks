export const Sponsorship = () => {
    return (
        <div className="bg-black text-white min-h-screen grid place-items-center">
            <div className="flex items-center justify-center w-full h-full text-center bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:60px_60px]">
                {/* Header and Text */}
                <div className="flex flex-col gap-2">
                    <h1 className="!text-4xl">Sponsor a Special Weekend</h1>
                    <p className="">
                        Placerat maecenas aliquam primis duis viverra integer.
                        Vehicula nulla bibendum facilisis per quis vehicula
                        risus donec euismod. Curabitur aliquet sem vel fermentum
                        lacinia. Aliquam sodales neque lorem, aliquam luctus
                        tellus viverra ut. Curabitur.
                    </p>
                    <p>
                        Vehicula nulla bibendum facilisis per
                        <strong> sponsors@spurhacks.com.</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};
