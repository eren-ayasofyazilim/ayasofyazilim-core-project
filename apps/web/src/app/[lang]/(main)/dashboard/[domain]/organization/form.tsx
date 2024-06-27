import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchRoles, fetchUsers, Role, User } from "./action";
import { Skeleton } from "@/components/ui/skeleton";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedUsers: User[]) => void;
  addedUsers: User[];
}

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedRoles: Role[]) => void;
  addedRoles: Role[];
}
const SkeletonCell = () => <Skeleton className="w-20 h-3" />;

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  addedUsers,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const loadUsers = async () => {
        const users = await fetchUsers();
        setUsers(users);
        setSelectedUsers(new Set(addedUsers.map((user) => user.id)));
        setLoading(false);
      };
      loadUsers();
    } else {
      setSelectedUsers(new Set());
    }
  }, [isOpen, addedUsers]);

  const handleToggleUser = (userId: string) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  const handleSave = () => {
    const selectedUserList = users.filter((user) => selectedUsers.has(user.id));
    onSave(selectedUserList);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select users</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-auto max-h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Email Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={
                          addedUsers.some((u) => u.id === user.id) ||
                          selectedUsers.has(user.id)
                        }
                        onChange={() => handleToggleUser(user.id)}
                        disabled={addedUsers.some((u) => u.id === user.id)}
                        className="mr-6"
                      />
                      {addedUsers.some((u) => u.id === user.id) && (
                        <span className="text-green-700 mr-2">✔</span>
                      )}
                      {user.userName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              {loading &&
                Array(4)
                  .fill({})
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <SkeletonCell />
                      </TableCell>
                      <TableCell>
                        <SkeletonCell />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-sm mt-2">{filteredUsers.length} total</p>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  addedRoles,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const loadRoles = async () => {
        const roles = await fetchRoles();
        setRoles(roles);
        setSelectedRoles(new Set(addedRoles.map((role) => role.id)));
        setLoading(false);
      };
      loadRoles();
    } else {
      setSelectedRoles(new Set());
    }
  }, [isOpen, addedRoles]);

  const handleToggleRole = (roleId: string) => {
    setSelectedRoles((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(roleId)) {
        newSelected.delete(roleId);
      } else {
        newSelected.add(roleId);
      }
      return newSelected;
    });
  };

  const handleSave = () => {
    const selectedRoleList = roles.filter((role) => selectedRoles.has(role.id));
    onSave(selectedRoleList);
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select roles</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-auto max-h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={
                          addedRoles.some((r) => r.id === role.id) ||
                          selectedRoles.has(role.id)
                        }
                        onChange={() => handleToggleRole(role.id)}
                        disabled={addedRoles.some((r) => r.id === role.id)}
                        className="mr-6"
                      />
                      {addedRoles.some((r) => r.id === role.id) && (
                        <span className="text-green-700 mr-2">✔</span>
                      )}
                      {role.name}
                    </TableCell>
                  </TableRow>
                ))}
              {loading &&
                Array(4)
                  .fill({})
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <SkeletonCell />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-sm mt-2">{filteredRoles.length} total</p>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
