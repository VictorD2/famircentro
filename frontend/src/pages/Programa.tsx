/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import NavBar from '../components/Helpers/NavBar';
import Badge from '../components/Helpers/Badge';

import Footer from '../components/Helpers/Footer';

import ScrollReveal from "scrollreveal";
import { useHistory, useParams } from 'react-router';
import { Curso } from '../components/CursosDash/Curso';

import * as cursosServices from '../components/CursosDash/CursosServices'
import CursoItem from '../components/CursosCliente/CursoItem';

interface Params {
    modalidad: string;
    tipo: string;
}

const Programa = () => {
    const modalidades = ['Sincronos', 'Asincronos', 'Talleres', 'Cursos']
    const params = useParams<Params>();
    const history = useHistory();
    const [tipo, setTipo] = useState<string>("")
    const [modalidad, setModalidad] = useState<string>("")
    const [cursos, setCursos] = useState<Curso[]>([])

    const getCursos = async () => {
        const res = await cursosServices.getAllCursos(params.tipo, params.modalidad);
        setCursos(res.data);
    }
    const settings = () => {
        params.modalidad === "Sincronos" ? setModalidad('Sincrónicos') : setModalidad('Asincrónicos');
        params.tipo === "Talleres" ? setTipo('Talleres') : setTipo('Cursos');
    }
    useEffect(() => {
        if (!modalidades.includes(params.modalidad) || !modalidades.includes(params.tipo)) return history.push('/');
        getCursos();
        settings();
        return () => {
        }
    }, [params.modalidad, params.tipo])



    useEffect(() => {
        const config = {
            duration: 1000,
            delay: 150,
            easing: 'ease',
        };
        ScrollReveal().reveal(".show", config);
        return () => {
        }
    }, [])

    return (
        <React.Fragment>
            <NavBar />
            <Badge name={`${tipo} ${modalidad}`} />

            <div className="mt-5" style={{ marginBottom: "4.5rem" }}>
                {cursos.map(curso => {
                    return <CursoItem key={curso.id_curso} curso={curso} />
                })}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Programa

