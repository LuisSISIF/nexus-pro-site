
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getUserData, updateUserData } from '@/actions/user-actions';
import { AlertCircle, Edit, Save, X, Loader2, UserCircle, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

// Tipos movidos para o componente que os utiliza
const UserDataSchema = z.object({
    nom_func: z.string(),
    celular: z.string(),
    login: z.string(),
    email: z.string().email(),
});
type UserData = z.infer<typeof UserDataSchema>;

const UserDataPage = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [initialData, setInitialData] = useState<UserData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            const companyId = localStorage.getItem('companyId');

            if (!userId || !companyId) {
                setError("IDs de usuário ou empresa não encontrados. Faça login novamente.");
                setLoading(false);
                return;
            }

            try {
                const result = await getUserData(Number(userId), Number(companyId));
                if (result.success && result.data) {
                    // Validar os dados recebidos com o schema Zod
                    const validatedData = UserDataSchema.parse(result.data);
                    setUserData(validatedData);
                    setInitialData(validatedData); // Guarda o estado inicial
                } else {
                    setError(result.message);
                }
            } catch (err) {
                if (err instanceof z.ZodError) {
                    setError("Os dados recebidos do servidor são inválidos.");
                } else {
                    setError("Ocorreu um erro ao buscar seus dados.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setUserData(initialData); // Restaura os dados originais
        setPassword('');
        setConfirmPassword('');
        setIsEditing(false);
    };

    const handleSave = async () => {
        const userId = localStorage.getItem('userId');
        const companyId = localStorage.getItem('companyId');

        if (!userData || !userId || !companyId) {
            toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível salvar os dados.' });
            return;
        }

        if (userData.login.length < 6) {
             toast({ variant: 'destructive', title: 'Erro de Validação', description: 'O login deve ter pelo menos 6 caracteres.' });
            return;
        }
        
        if (password !== confirmPassword) {
            toast({ variant: 'destructive', title: 'Erro de Validação', description: 'As senhas não coincidem.' });
            return;
        }

        if (password && password.length < 6) {
             toast({ variant: 'destructive', title: 'Erro de Validação', description: 'A nova senha deve ter pelo menos 6 caracteres.' });
            return;
        }

        setSaving(true);
        try {
            const result = await updateUserData({
                userId: Number(userId),
                companyId: Number(companyId),
                nome: userData.nom_func,
                celular: userData.celular,
                login: userData.login,
                email: userData.email,
                senha: password || '',
                confirmarSenha: confirmPassword || '',
            });

            if (result.success) {
                toast({ title: 'Sucesso!', description: result.message });
                setInitialData(userData); // Atualiza o estado inicial com os novos dados
                setIsEditing(false);
                setPassword('');
                setConfirmPassword('');
            } else {
                toast({ variant: 'destructive', title: 'Erro ao Salvar', description: result.message });
            }
        } catch (err) {
            toast({ variant: 'destructive', title: 'Erro Inesperado', description: 'Ocorreu um erro ao salvar.' });
        } finally {
            setSaving(false);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(userData) {
            setUserData({...userData, [name]: value});
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full" /></div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full" /></div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                    <AlertCircle className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold">Ocorreu um Erro</h3>
                    <p>{error}</p>
                </div>
            );
        }

        if (userData) {
            return (
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="nom_func">Nome Completo</Label>
                            <Input id="nom_func" name="nom_func" value={userData.nom_func} onChange={handleInputChange} readOnly={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="celular">Celular / WhatsApp</Label>
                            <Input id="celular" name="celular" value={userData.celular} onChange={handleInputChange} readOnly={!isEditing} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="login">Login de Acesso</Label>
                            <Input id="login" name="login" value={userData.login} onChange={handleInputChange} readOnly={!isEditing} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={userData.email} onChange={handleInputChange} readOnly={!isEditing} />
                        </div>
                    </div>
                    {isEditing && (
                        <div className="space-y-6 pt-6 border-t border-dashed">
                             <p className="text-sm text-muted-foreground">Deixe os campos de senha em branco se não quiser alterá-la.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Nova Senha</Label>
                                    <div className="relative">
                                        <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(prev => !prev)}>
                                            {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                                     <div className="relative">
                                        <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(prev => !prev)}>
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            );
        }

        return null;
    };


    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dados do Usuário</h1>
                <p className="text-muted-foreground">Altere suas informações de perfil e acesso.</p>
            </div>
            <Card>
                <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <UserCircle className="w-6 h-6 text-primary"/>
                             Suas Informações
                        </CardTitle>
                        <CardDescription>
                            Visualize e edite seus dados pessoais e de login.
                        </CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={handleCancel} disabled={saving}>
                                    <X className="mr-2 h-4 w-4"/> Cancelar
                                </Button>
                                <Button onClick={handleSave} disabled={saving}>
                                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                                    {saving ? 'Salvando...' : 'Salvar'}
                                </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit} disabled={loading || !!error}>
                                <Edit className="mr-2 h-4 w-4"/> Editar Dados
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserDataPage;
