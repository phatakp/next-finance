"use server";

import { GroupFormData } from "@/app/(protected)/groups/components/grp-form/grp-zod-schema";
import { getAuthServerSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { GroupFormSchema } from "@/lib/zod-schemas/group";
import { APIGrpResponse, FormAction } from "@/types/app";

export async function getUserGroups() {
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };
  const groups = await db.group.findMany({
    where: {
      userIds: {
        has: session.user.id,
      },
    },
    include: { users: { select: { id: true, name: true } } },
  });
  return { success: true, data: groups as APIGrpResponse[] };
}

export async function processGroupAction(
  formData: GroupFormData,
  action: FormAction
) {
  switch (action) {
    case FormAction.Update:
      return updateGroupAction(formData);
    case FormAction.Delete:
      return deleteGroupAction(formData);
    default:
      return addGroupAction(formData);
  }
}

export async function addGroupAction(formData: GroupFormData) {
  const { name, users } = GroupFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };

  const currUser = users.find((user) => user.value === session.user.id);
  if (!currUser) return { success: false, error: "You are not authorized" };
  const userIds = users.map((u) => u.value);

  const group = await db.group.create({
    data: {
      name,
      userIds,
    },
    include: {
      users: { select: { id: true, name: true } },
    },
  });
  if (group) {
    return { success: true, data: group as APIGrpResponse };
  }
  return { success: false, error: "Could not add group" };
}

export async function updateGroupAction(formData: GroupFormData) {
  const { id, name, users } = GroupFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };
  const dbGrp = await db.group.findUnique({ where: { id } });
  if (!dbGrp) return { success: false, error: "Group Not Found" };
  const userIds = users.map((u) => u.value);

  const group = await db.group.update({
    where: { id },
    data: {
      name,
      userIds,
    },
    include: {
      users: { select: { id: true, name: true } },
    },
  });
  if (group) {
    return { success: true, data: group as APIGrpResponse };
  }
  return { success: false, error: "Could not update group" };
}

export async function deleteGroupAction(formData: GroupFormData) {
  const { id } = GroupFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };
  const dbGrp = await db.group.findUnique({ where: { id } });
  if (!dbGrp) return { success: false, error: "Group Not Found" };

  await db.group.delete({ where: { id } });
  return { success: true, data: dbGrp as APIGrpResponse };
}
