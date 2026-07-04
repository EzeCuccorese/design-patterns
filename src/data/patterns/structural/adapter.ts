import { Pattern } from '../../types';

export const adapter: Pattern = {
  id: 'adapter',
  name: 'Adapter',
  category: 'structural',
  description: 'Permite la colaboración de objetos con interfaces incompatibles. Traduce las llamadas de un cliente a un formato que el servicio receptor espera, actuando como un traductor intermedio.',
  advantages: [
    'Principio de Responsabilidad Única (SRP): separa la lógica de conversión de datos de la lógica de negocio principal.',
    'Principio de Abierto/Cerrado (OCP): introduce nuevos adaptadores sin modificar el código de los clientes o servicios existentes.',
    'Permite reutilizar clases existentes que no tienen la interfaz exacta requerida.'
  ],
  analogy: 'Rescatado de *Mi granito de Java*, piensa en la conversión entre Entidades de Dominio (User) y Objetos de Transferencia de Datos (UserDto). El cliente necesita mostrar datos simplificados en la vista, pero la base de datos devuelve una entidad compleja. El Adaptador (UserConverter) traduce una interfaz en otra de forma transparente.',
  code: {
    java: `// Java 21 - Adaptador / Convertidor entre Entidades y DTOs (Records)
import java.util.List;

// Entidad de Dominio
public class User {
    private Long id;
    private String username;
    private String password; // Sensible
    private List<String> roles;

    // Getters y setters omitidos...
    public User(Long id, String username, String password, List<String> roles) {
        this.id = id; this.username = username; this.password = password; this.roles = roles;
    }
    public String getUsername() { return username; }
    public List<String> getRoles() { return roles; }
}

// Interfaz del DTO (Incompatible con la Entidad compleja)
public record UserDto(String username, List<String> roles) {}

// Adaptador (Converter)
public class UserAdapter {
    public UserDto toDto(User user) {
        // Filtra la contraseña por seguridad y simplifica la interfaz
        return new UserDto(user.getUsername(), user.getRoles());
    }
}`,
    python: `# Python 3 - Adapter utilizando clases de datos (dataclasses)
from dataclasses import dataclass
from typing import List

@dataclass
class User:
    id: int
    username: str
    password: str  # Datos sensibles
    roles: List[str]

@dataclass
class UserDto:
    username: str
    roles: List[str]

# Adaptador de clase
class UserAdapter:
    @staticmethod
    def to_dto(user: User) -> UserDto:
        return UserDto(
            username=user.username,
            roles=user.roles
        )
`,
    typescript: `// TypeScript - Adapter para formatear datos de API
interface UserEntity {
  id: number;
  username: str;
  passwordHash: string;
  roles: string[];
}

interface UserDto {
  username: string;
  roles: string[];
}

export class UserAdapter {
  public static toDto(user: UserEntity): UserDto {
    return {
      username: user.username,
      roles: user.roles
    };
  }
}
`,
    go: `// Go (Golang) - Adaptación entre Structs de datos incompatibles
package main

import "fmt"

// Estructura de base de datos
type UserEntity struct {
	ID           int64
	Username     string
	PasswordHash string
	Roles        []string
}

// Estructura de Transporte
type UserDto struct {
	Username string
	Roles    []string
}

// Adaptador
type UserAdapter struct{}

func (ua *UserAdapter) ToDto(entity *UserEntity) *UserDto {
	return &UserDto{
		Username: entity.Username,
		Roles:    entity.Roles,
	}
}

func main() {
	entity := &UserEntity{ID: 1, Username: "eze", PasswordHash: "secret", Roles: []string{"ADMIN"}}
	adapter := &UserAdapter{}
	dto := adapter.ToDto(entity)
	fmt.Println(dto.Username) // eze
}`
  },
  output: `User convertido a UserDto con éxito:
Username: eze
Roles: [ADMIN]
(Seguridad: contraseña y metadatos no transferidos)`,
  graphicAsset: "/images/adapter.jpg"};
